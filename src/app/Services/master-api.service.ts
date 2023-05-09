import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogsModel } from '../Domain/BlogModal';

@Injectable({
  providedIn: 'root'
})
export class MasterApiService {

  constructor(private http:HttpClient) { }

  getAllBlogs(){
   return this.http.get<Array<BlogsModel>>('https://dotnetcore-apis.getallpapers.com/api/Admin/GetAllBlogs'); 
  }
  updateBlog(payload:BlogsModel){
   return this.http.post('https://dotnetcore-apis.getallpapers.com/api/Admin/UpdateBlog',payload); 
  }
}
