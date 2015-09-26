package nnserver
import "github.com/igorcoding/go-nn/util"

type ApiLearnRequest struct {
	Inputs int
	Outputs int
	LearningRate float64
	Threshold float64
	Iterations int
	TrainExamples []util.TrainExample
}


type ApiResponse struct {
	Status string    `json:"status"`
	ErrorStr string  `json:"errstr,omitempty"`
	Data interface{} `json:"data"`
}