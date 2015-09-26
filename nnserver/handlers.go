package nnserver
import (
	"net/http"
	"github.com/igorcoding/go-nn/perceptron"
	"encoding/json"
	"github.com/nu7hatch/gouuid"
)

func (self *nnServer) setupHandlers() {
	self.serverMux.HandleFunc("/", self.indexHandler)
	self.serverMux.HandleFunc("/api/learn", self.apiLearn)
	self.serverMux.HandleFunc("/api/recognize", self.apiRecognize)
}

func (self *nnServer) indexHandler(w http.ResponseWriter, r *http.Request) {
	t := self.getTemplate("index.html")
	w.WriteHeader(http.StatusOK)
	data := self.makeData()
	data["__title__"] = self.conf.Title
	t.Execute(w, data)
}

func (self *nnServer) apiLearn(w http.ResponseWriter, r *http.Request) {
	if (!self.requireMethods(w, r, []string{"POST"})) { return }

	session, err := self.getSession(w, r)
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

	netUuid, err := uuid.NewV4()
	if err != nil {
		self.log.Error(err.Error())
	}
	netId := netUuid.String()
	self.nets[netId] = net
	session.Values["netId"] = netId
	err = session.Save(r, w)
	if err != nil {
		self.log.Error(err.Error())
	}

	net.Train(req.TrainData)

	resp := ApiResponse{
		Status: "ok",
	}
	self.apiOkResponse(w, &resp)
}

func (self *nnServer) apiRecognize(w http.ResponseWriter, r *http.Request) {
	if (!self.requireMethods(w, r, []string{"POST"})) { return }

	session, err := self.getSession(w, r)
	if err != nil { return }

	netId, ok := session.Values["netId"].(string)
	if !ok {
		resp := ApiResponse{
			ErrorStr: "Training should be perfomed before recognition",
		}
		self.apiErrorResponse(w, &resp, 403)
		return
	}
	net := self.nets[netId];
	if net == nil {
		resp := ApiResponse{
			ErrorStr: "Training should be perfomed before recognition",
		}
		self.apiErrorResponse(w, &resp, 403)
		return
	}

	var req ApiRecognizeRequest
	decoder := json.NewDecoder(r.Body)
	err = decoder.Decode(&req)
	if (err != nil) {
		self.errorResponse(w, http.StatusBadRequest, "request could not been decoded: " + err.Error());
	}

	prediction, err := net.Predict(req.Data)
	if err != nil {
		resp := ApiResponse{
			ErrorStr: "Error while recognizing: " + err.Error(),
		}
		self.apiErrorResponse(w, &resp, 400)
		return
	}

	data := self.makeData()
	data["prediction"] = prediction
	resp := ApiResponse{
		Data: data,
	}
	self.apiOkResponse(w, &resp)
}