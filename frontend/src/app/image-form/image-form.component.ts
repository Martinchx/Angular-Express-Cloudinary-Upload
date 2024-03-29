import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-image-form',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.css',
})
export class ImageFormComponent {
  constructor(private http: HttpClient) {}

  image: any;
  imageUploaded: any;
  processing = {
    message: 'Upload an image and see it here!',
    status: false,
  };

  getFile(event: any) {
    // Saving the image
    this.image = event.target.files[0];
    console.log('Image upload:', this.image);
  }

  submitData(event: any) {
    this.imageUploaded = null;
    this.processing.status = true;
    this.processing.message = 'Uploading...';

    // Preventing window refreshing
    event.preventDefault();

    // Creating the formData with the image to send it to the server
    let formData = new FormData();
    formData.set('image', this.image);

    // In this case you can use a service to handle the http request and do it in a different way, but to simplify it we do it directly and store the result
    this.http
      .post('http://localhost:8080/uploads/upload-image', formData)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.processing.message =
            'An error occurred while uploading the image :(';
          this.processing.status = false;
          return [];
        })
      )
      .subscribe((res) => {
        this.imageUploaded = res;
        this.processing.message = 'Click here to see the image';
        this.processing.status = false;
        console.log(res);
      });
  }
}
