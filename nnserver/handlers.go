package nnserver
import (
	"net/http"
	"github.com/igorcoding/go-nn/perceptron"
	"encoding/json"
)

func (self *nnServer) setupHandlers() {
	self.serverMux.HandleFunc("/", self.indexHandler)
	self.serverMux.HandleFunc("/api/learn/", self.api_learn)
}

func (self *nnServer) indexHandler(w http.ResponseWriter, r *http.Request) {
	t := self.getTemplate("index.html")
	w.WriteHeader(http.StatusOK)
	data := self.makeData()
	data["__title__"] = self.conf.Title
	t.Execute(w, data)
}

func (self *nnServer) api_learn(w http.ResponseWriter, r *http.Request) {
	if (!self.requireMethods(w, r, []string{"POST"})) { return }

	session, err := self.getSessionId(w, r)
	if err != nil { return }

	var req ApiLearnRequest
	decoder := json.NewDecoder(r.Body)
	err = decoder.Decode(&req)
	if (err != nil) {
		self.errorResponse(w, http.StatusBadRequest, "request could not been decoded: " + err.Error());
	}

	conf := &perceptron.PerceptronConf{
		Inputs: req.Inputs,
		LearningRate: req.LearningRate,
		Threshold: req.Threshold,
		Iterations: req.Iterations,
	}

	net := perceptron.BuildPerceptronNet(conf)

	session.Values["net"] = net
	session.Save(r, w)

	net.Train(req.TrainExamples)

	resp := ApiResponse{
		Status: "ok",
	}
	self.apiOkResponse(w, &resp)
}