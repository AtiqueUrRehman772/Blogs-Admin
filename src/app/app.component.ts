import { Component, OnInit } from '@angular/core';
import { MasterApiService } from './Services/master-api.service';
import { BlogsModel } from './Domain/BlogModal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Blogs-Admin';


  constructor (private masterApi:MasterApiService){
  }

  ngOnInit(): void {
    var menu_btn:any = document.querySelector("#menu-btn");
    var sidebar:any = document.querySelector("#sidebar");
    var container:any = document.querySelector(".my-container");
    menu_btn.addEventListener("click", () => {
      sidebar.classList.toggle("active-nav");
      container.classList.toggle("active-cont");
    });
    //@ts-ignore
    $('#example').DataTable();

    this.getAllBlogs();
  }
  toggleActive(activeEl:any){
    //@ts-ignore
    $('.active').removeClass('active')
    activeEl?.srcElement?.classList?.add("active");
  }



  blogsList:Array<BlogsModel> = [];
  getAllBlogs(){
    this.masterApi.getAllBlogs().subscribe(response=>{
      console.log(response);
      this.blogsList = response;
    });
  }
}
