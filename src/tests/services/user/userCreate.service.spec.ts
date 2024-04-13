import { UserService } from "../../../services/userService";
import { DataSource } from "typeorm";                 
import { AppDataSource } from "../../../data-source"; 
import { iUserCreate } from "../../../interfaces/userInterface";

describe("Create an user", () => {
  let connection: DataSource;   
  const service = new UserService()          

  beforeAll(async () => {                 
    await AppDataSource.initialize()      
      .then((res) => (connection = res))  
      .catch((err) => {         
        console.error("Error during Data Source initialization", err); 
      });                       
  });                           

  afterAll(async () => {        
    await connection.destroy(); 
  });                           

  test("Should insert the information of the new user in the database", async () => {
    const email = "alysson@email.com";
    const name = "Alysson";
    const password = "1234";
    const is_admin = false;
    const created_at = new Date();

    const userData:iUserCreate = { email, name, password, is_admin,created_at };

    const newUser = await service.createUser(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: newUser.id,
        email,
        name, 
        password: newUser.password, 
        is_admin,
        created_at: expect.any(Date)
      })
    );
  });
});
