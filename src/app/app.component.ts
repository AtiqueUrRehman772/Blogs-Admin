import { Component, OnInit } from '@angular/core';
import { MasterApiService } from './Services/master-api.service';
import { BlogsModel } from './Domain/BlogModal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Blogs-Admin';
  editor: any;
  BlogForm: FormGroup;
  BlogEditForm: FormGroup;
  constructor(private masterApi: MasterApiService, fg: FormBuilder) {
    this.BlogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      writer: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required]),
    });
    this.BlogEditForm = new FormGroup({
      editTitle: new FormControl('', [Validators.required]),
      editUrl: new FormControl('', [Validators.required]),
      editWriter: new FormControl('', [Validators.required]),
      editImg: new FormControl('', [Validators.required]),
      editDetails: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.BlogForm.controls;
  }
  ngOnInit(): void {
    var menu_btn: any = document.querySelector("#menu-btn");
    var sidebar: any = document.querySelector("#sidebar");
    var container: any = document.querySelector(".my-container");
    menu_btn.addEventListener("click", () => {
      sidebar.classList.toggle("active-nav");
      container.classList.toggle("active-cont");
    });
    setTimeout(() => {
      //@ts-ignore
      $('#example').DataTable();
    }, 1000);

    this.getAllBlogs();
  }
  toggleActive(activeEl: any) {
    //@ts-ignore
    $('.active').removeClass('active')
    activeEl?.srcElement?.classList?.add("active");
  }

  AddNew: boolean = false;
  addNewBlog() {
    this.AddNew = true;
  }
  closeAddNew() {
    this.AddNew = false;
  }
  editBlg: boolean = false;
  editBlog() {
    this.editBlg = true;
  }
  closeEdit() {
    this.editBlg = false;
  }
  onSubmit() {
    //@ts-ignore
    let val = String(tinymce.activeEditor.getContent("editor"));
    console.log(val);
    val.replace('<p>', '');
    val.replace('</p>', '');
    this.beingEdited.Description = val;
    let payload: BlogsModel = {
      Id: this.beingEdited.Id,
      Title: this.beingEdited.Title,
      WrittenBy: this.beingEdited.WrittenBy,
      Description: this.beingEdited.Description,
      PublishedOn: this.beingEdited.PublishedOn
    }
    console.log(payload);
  }
  onUpdate() {
    //@ts-ignore
    let val = String(tinymce.activeEditor.getContent("editor"));
    console.log(val);
    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);
    val.replace('<p>', '');
    val.replace('</p>', '');
    this.beingEdited.Description = val;
    let payload: BlogsModel = {
      Id: String(this.beingEdited.Id),
      Title: String(this.BlogEditForm.controls['editTitle'].value ?? this.beingEdited.Title),
      WrittenBy: String(this.BlogEditForm.controls['editWriter'].value ?? this.beingEdited.WrittenBy),
      Description: String(this.beingEdited.Description),
      PublishedOn: date//String(this.beingEdited.PublishedOn)
    }
    console.log(payload);
    this.masterApi.updateBlog(payload).subscribe((response: any) => {
      console.log(response);
    })
  }
  getValue(e: any) {
    console.log(e.target.value);
  }
  beingEdited: BlogsModel = {};
  selectItemForEdit(blog: BlogsModel) {
    this.beingEdited = blog;
    this.editBlg = true;
    console.log('Being Edited : ', blog);
    //@ts-ignore
    tinymce.activeEditor.setContent("<p>" + this.beingEdited.Description + "</p>");
  }
  blogsList: Array<BlogsModel> = [];
  getAllBlogs() {
    this.masterApi.getAllBlogs().subscribe(response => {
      this.blogsList = response;
    });
  }
  deleteBlog() {
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
