import { PostModel } from "../model/post";
import { AddPost, AddPostParams } from "../usecase/add-post";
import { DeletePost } from "../usecase/delete-post";
import { FindPostById } from "../usecase/find-post-by-id";
import { ListPostByDate, ListPostByDateParams } from "../usecase/list-post-by-date";
import { UpdatePost, UpdatePostParams } from "../usecase/update-post";

export const mockPostModel = (): PostModel => ({
    id: "any_id",
    title: "any_title",
    description: "any_description",
    body: "any_body",
    created_at: new Date,
    updated_at: new Date,
});

export const mockAddPostParams = (): AddPostParams => ({
    title: "any_title",
    description: "any_description",
    body: "any_body",
});

export const mockAddPost = (): AddPost => {
    class AddPostStub implements AddPost{
        async add(data: AddPostParams): Promise<PostModel>{
            return Promise.resolve(mockPostModel());
        }
    }
    return new AddPostStub;
}

export const mockUpdatePost = (): UpdatePost => {
    class UpdatePostStub implements UpdatePost {
        async update(data: UpdatePostParams): Promise<PostModel> {
            return Promise.resolve(mockPostModel());
        }
    }
    return new UpdatePostStub;
}

export const mockUpdatePostParams = (): UpdatePostParams => ({
    id: "a12d24fe-7d31-47cd-9755-ddee987965d4",
    title: "other_title",
    description: "any_description",
    body: "other_body",
});

export const mockUpdatedPostModel = (): PostModel => ({
    id: "any_id",
    title: "other_title",
    description: "any_description",
    body: "other_body",
    created_at: new Date,
    updated_at: new Date,
});

export const mockListPostByDateParams = (): ListPostByDateParams => ({
    start_date: new Date("2021-11-20"),
    end_date: new Date("2022-11-26")
})

export const mockListPostByDate = (): ListPostByDate => {
    class ListPostByDateStub implements ListPostByDate {
        async list(date: ListPostByDateParams): Promise<PostModel[]> {
            return Promise.resolve([mockPostModel(), mockPostModel()]);
        }
    }
    return new ListPostByDateStub;
}

export const mockDeletePost = (): DeletePost => {
    class DeletePostStub implements DeletePost {
        async delete(id: string): Promise<void>{
            return Promise.resolve();
        }
    }
    return new DeletePostStub;
}

export const mockFindPostById = (): FindPostById => {
    class FindPostByIdStub implements FindPostById {
        async findById(id: string): Promise<PostModel>{
            return Promise.resolve(mockPostModel());
        }
    }
    return new FindPostByIdStub;
}