import  express, { Application }  from "express"
import http from 'http'
import { Server } from "socket.io"
import { server } from "typescript"

class App{

    private app: Application
    private http:http.Server
    private io: Server

  constructor(){
    this.app = express()
    this.http = http.createServer(this.app)
    this.io = new Server(this.http)
    this.listenSocket()
    this.Routes()
  }

    listnServer(){
           this.http.listen(3000, ()=> console.log( 'server is runnin'))
    }
    listenSocket(){
        this.io.on('connection',(socket) =>{
            console.log('user connected =>', socket.id)
       
            
            socket.on('usuario', (msg)=>{
                console.log("🚀 ~ File: server.ts:24 ~ App ~ socket.on ~ msg:",msg)
                this.io.emit('usuario', msg);
            })
        });
    }
    Routes(){
        this.app.get('/', (req, res)=>{
            res.sendFile(__dirname + '/index.html')
        })
    }
}

const app = new App()

app.listnServer()
