// Imports
import { UserRepository } from "@modules/user/repositories/user.repository";
import { container } from "tsyringe";

// Repository
container.registerSingleton(UserRepository);
