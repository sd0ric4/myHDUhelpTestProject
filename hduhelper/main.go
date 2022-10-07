package main

import (
	"net/http"
)

func main() {
	//设置访问的路由
	http.HandleFunc("/index", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			w.Write([]byte("<h1>Hello Codey!<h1>"))
		}
	})
	http.ListenAndServe("127.0.0.1:9300", nil) //设置监听的端口
}
