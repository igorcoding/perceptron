package nnserver

import (
	"net/http"
	"gopkg.in/tylerb/graceful.v1"
	"strconv"
	"github.com/op/go-logging"
	"os"
	"time"
	"path"
	"html/template"
)

const (
	DEFAULT_PORT = 9000
)

type NNServerConf struct {
	Name string
	Title string
	Port uint16
	LogLevel int
	TemplatesDir string
	StaticDir string
	StaticUrl string
}


type nnServer struct {
	conf *NNServerConf

	server *graceful.Server
	serverMux *http.ServeMux
	log *logging.Logger
}

func NewNNServer(conf *NNServerConf) *nnServer {
	if conf.Name == "" {
		conf.Name = "server"
	}
	if conf.Port == 0 {
		conf.Port = DEFAULT_PORT
	}

	self := &nnServer{conf:conf}

	self.serverMux = http.NewServeMux()
	self.server = &graceful.Server{
		Timeout: 500 * time.Millisecond,

		Server: &http.Server{
			Addr: ":" + self.getPortStr(),
			Handler: self.LogMiddleware(self.serverMux),
		},
	}
	self.server.SetKeepAlivesEnabled(false) // FIXME

	self.setupHandlers()
	fs := http.FileServer(http.Dir(self.conf.StaticDir))
	self.serverMux.Handle(self.conf.StaticUrl, http.StripPrefix("", fs))
	self.setupLogging()
	return self
}

func (self *nnServer) getPortStr() string {
	return strconv.Itoa(int(self.conf.Port))
}

type loggedResponse struct {
	http.ResponseWriter
	status int
}

func (l *loggedResponse) WriteHeader(status int) {
	l.status = status
	l.ResponseWriter.WriteHeader(status)
}


func (self *nnServer) setupLogging() {
	self.log = logging.MustGetLogger(self.conf.Name)
	format := logging.MustStringFormatter(
		"%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.4s} %{color:reset}%{message}",
	)
	loggingBackend := logging.NewLogBackend(os.Stdout, "", 0)
	backendFormatter := logging.NewBackendFormatter(loggingBackend, format)
	loggingBackendLeveled := logging.AddModuleLevel(backendFormatter)
	loggingBackendLeveled.SetLevel(logging.Level(self.conf.LogLevel), "")
	logging.SetBackend(loggingBackendLeveled)
}

func (self *nnServer) getTemplate(templateName string) *template.Template {
	t, err := template.ParseFiles(path.Join(self.conf.TemplatesDir, "index.html"))
	if (err != nil) {
		panic(err.Error())
	}
	return t
}

func (self *nnServer) LogMiddleware(handler http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		lw := &loggedResponse{ResponseWriter: w}
		handler.ServeHTTP(lw, r)
		self.log.Info("%s %s %d", r.Method, r.URL, lw.status)
	})
}


func (self *nnServer) Start() {
	self.log.Notice("Server started on port " + self.getPortStr())
	err := self.server.ListenAndServe()
	self.log.Notice("Server stopped")
	if (err != nil) {
		self.log.Critical(err.Error())
	}
}

