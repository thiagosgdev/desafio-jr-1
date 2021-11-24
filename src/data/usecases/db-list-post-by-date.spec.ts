import { mockListPostByDateParams } from "@/domain/test/mock-post";
import { ListPostByDateRepository } from "../protocols/list-post-by-date-repository";
import { mockListPostByDateRepository } from "../test/db-post";
import { DbListPostByDate } from "./db-list-post-by-date";

type SutTypes = {
    sut: DbListPostByDate,
    listPostByDateStub: ListPostByDateRepository
}

const makeSut = (): SutTypes => {
    const listPostByDateStub = mockListPostByDateRepository();
    const sut = new DbListPostByDate(listPostByDateStub);
    return {
        sut,
        listPostByDateStub
    }
}

describe("Db List Posts by Date", () => {
    test("Should call ListPostByDateRepository with the correct values", async () => {
        const { sut, listPostByDateStub } = makeSut();
        const listSpy = jest.spyOn(listPostByDateStub, "list");
        const date = mockListPostByDateParams();
        await sut.list(date);
        expect(listSpy).toHaveBeenCalledWith(date);
    })
});