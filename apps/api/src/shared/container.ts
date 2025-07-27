import { UserRepository } from "@modules/user/repository/user.repository";
import { container } from "tsyringe";

// Repository
container.registerSingleton(UserRepository);
