import { Model, createServer } from "miragejs"
import { users } from "./mocks/users";
import { IUser } from "../app/types/user.type";

export default function initServer() {
  createServer({
    models: {
      users: Model.extend<Partial<IUser>>({})
    },
    seeds(server) {
      server.db.loadData({
        users: users
      });
    },
    routes() {
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.db['users']
      }, { timing: 2000 })

      let userId = 4

      this.post("/users", (schema, request) => {
        let userDto = JSON.parse(request.requestBody)
        userDto.id = userId++

        return schema.create("users", userDto).attrs
      })
    },
  })
}
