package nnserver
import (
	"net/http"
	"fmt"
)

func (self *nnServer) setupHandlers() {
	self.serverMux.HandleFunc("/", self.indexHandler)
//	self.serverMux.HandleFunc("/static", self.test)
}

func (self *nnServer) indexHandler(w http.ResponseWriter, r *http.Request) {
	t := self.getTemplate("index.html")
	w.WriteHeader(http.StatusOK)
	data := make(map[string]string)
	data["__title__"] = self.conf.Title
	t.Execute(w, data)
}

func (self *nnServer) test(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hola. Test!")
}