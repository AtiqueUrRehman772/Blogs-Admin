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
    setTimeout(()=>{
      //@ts-ignore
      $('#example').DataTable();
    },1000);

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


  deleteBlog(){
    //@ts-ignore
    Swal.fire({
      title: 'Do you want to delete this blog?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
      //@ts-ignore
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //@ts-ignore
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        //@ts-ignore
        Swal.fire('Operation cancelled!', '', 'info')
      }
    })
  }
}
