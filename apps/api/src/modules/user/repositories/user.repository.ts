import { UserModel } from "@modules/user/repositories/user.schema.repository";
import {
  aggregationBuildCount,
  aggregationBuildPagination,
  aggregationBuildSortPipeline,
} from "@shared/utils/mongo.utils";
import type { User } from "arc/user/entities";
import type { UserReadListDto } from "arc/user/useCases";
import { Types, type PipelineStage } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository {
  async findByEmail(email?: string): Promise<User | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: { email },
      },
    ];

    const result = await UserModel.aggregate<User>(pipeline);
    return result[0] ?? null;
  }

  async create(
    user: Omit<User, "_id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return (await UserModel.create(user)).toJSON();
  }

  async findById(userId: string): Promise<User | null> {
    const pipeline: PipelineStage[] = [
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
    ];

    const result = await UserModel.aggregate<User>(pipeline);
    return result[0] ?? null;
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    const result = await UserModel.findOneAndUpdate({ _id: userId }, user, {
      new: true,
    });

    return result!.toJSON() as User;
  }

  async readList(params: UserReadListDto): Promise<User[]> {
    const pipeline: PipelineStage[] = [];

    pipeline.push(...aggregationBuilderFilter(params));
    pipeline.push(...aggregationBuildSortPipeline(params));
    pipeline.push(...aggregationBuildPagination(params));

    return await UserModel.aggregate<User>(pipeline);
  }

  async count(params: UserReadListDto): Promise<number> {
    const pipeline = [];

    pipeline.push(...aggregationBuilderFilter(params));
    pipeline.push(...aggregationBuildCount());

    const [result] = await UserModel.aggregate(pipeline);

    return result?.count || 0;
  }
}

function aggregationBuilderFilter(params: UserReadListDto) {
  const { query } = params;
  const pipeline: PipelineStage[] = [];

  if (query) {
    const searchQuery = query.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&").trim();

    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { email: { $regex: searchQuery, $options: "i" } },
        ],
      },
    });
  }

  return pipeline;
}
