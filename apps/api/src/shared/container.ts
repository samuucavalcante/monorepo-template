// Imports
import { TestRepository } from "@modules/test/repositories/test.repository";
import { UserRepository } from "@modules/user/repository/user.repository";
import { container } from "tsyringe";

// Repository
container.registerSingleton(TestRepository);
container.registerSingleton(UserRepository);
