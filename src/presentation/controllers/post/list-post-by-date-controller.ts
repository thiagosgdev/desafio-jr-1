import { PostModel } from "@/domain/model/post";
import { ListPostByDate, ListPostByDateParams } from "@/domain/usecase/list-post-by-date";
import { Controller } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";


export class ListPostByDateController implements Controller {

    constructor(
        private readonly listPostByDate: ListPostByDate
    ){}
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try{
            const { start_date, end_date } = request.body;
            const posts = await this.listPostByDate.list({start_date, end_date});        
            if(posts.length >= 1){
                return { 
                    status: 200,
                    body: posts
                }
            }
            return {
                status: 204,
                body: "No post found between those dates"
            }
        }catch(error){
            return {
                status: 500,
                body: error
            }
        }
    }
}