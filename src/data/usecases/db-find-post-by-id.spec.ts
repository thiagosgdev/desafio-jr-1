import { FindPostByIdRepository } from "../protocols/find-post-by-id-repository";
import { mockFindPostByIdRepository } from "../test/db-post";
import { DbFindPostById } from "./db-find-post-by-id";

type SutTypes = {
    sut: DbFindPostById,
    findPostByIdRepositoryStub: FindPostByIdRepository
}

const makeSut = (): SutTypes => {
    const findPostByIdRepositoryStub = mockFindPostByIdRepository();
    const sut = new DbFindPostById(findPostByIdRepositoryStub);
    return {
        sut,
        findPostByIdRepositoryStub
    }
}

describe("Db List Post By Id", () => {
    test("Should call FindPostByIdRepository with the correct values", async () => {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        const findSpy = jest.spyOn(findPostByIdRepositoryStub, "findById");
        await sut.findById("any_id");
        expect(findSpy).toHaveBeenCalledWith("any_id")
    });

    test("Should return a Post on FindPostByIdRepository success", async () => {
        const { sut } = makeSut();
        const post = await sut.findById("any_id");
        expect(post).toHaveProperty("id");
    });

    test("Should return null on FindPostByIdRepository fail", async () => {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest.spyOn(findPostByIdRepositoryStub, "findById").mockReturnValueOnce(Promise.resolve(null));
        const post = await sut.findById("any_id");
        expect(post).toBeNull();
    });

    test("Should return null on FindPostByIdRepository fail", async () => {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest.spyOn(findPostByIdRepositoryStub, "findById").mockReturnValueOnce(Promise.reject(new Error()));
        const promise = sut.findById("any_id");
        await expect(promise).rejects.toThrow();
    });
});