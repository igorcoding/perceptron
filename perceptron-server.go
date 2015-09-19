package main
import "github.com/igorcoding/perceptron/nnserver"

func main() {
	serverConf := &nnserver.NNServerConf{
		Port: 9000,
		Name: "NNServer",
		Title: "Perceptron Image Recognition",
		LogLevel: 5,

		TemplatesDir: "templates",
		StaticDir: ".",
		StaticUrl: "/static/",
	}
	server := nnserver.NewNNServer(serverConf)
	server.Start()
}
