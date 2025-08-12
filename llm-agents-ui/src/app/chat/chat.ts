import { NgModule,Component,ViewChild,ElementRef, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatMenu } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  imports: [MatIconModule,FormsModule,MatFormFieldModule,MatInputModule,
    MatSelectModule,CommonModule,MatMenu,MatMenuModule,MatChipsModule,HttpClientModule
  ]
})
export class ChatDashboardComponent {
  prompt = '';
  @ViewChild('fileInput') fileInput!:ElementRef<HTMLInputElement>;
  selectedModel = 'Chat';
  models = [
    { name: 'Chat', value: 'Chat', desc: 'Ask any simple query.' },
    { name: 'Elastic', value: 'mistral-large', desc: 'Fetch From ElasticSearch.' },
    { name: 'RAG', value: 'mistral-small', desc: 'Fetch From RAG.' }
  ];
  isFileAttached=false;
  constructor(private http: HttpClient) {}

 sendPrompt() {
  // Prevent sending if both prompt and file are empty
  if (!this.prompt.trim() && !this.attachedFile) return;

  const formData = new FormData();
  formData.append('model', this.selectedModel);
  formData.append('prompt', this.prompt);

  if (this.attachedFile) {
    formData.append('file', this.attachedFile);
  }

  this.http.post('/api/sendPrompt', formData).subscribe({
    next: (res: any) => {
      console.log('✅ Sent successfully:', res);
      // Reset fields after sending
      this.prompt = '';
      this.attachedFile = null;
      this.isFileAttached = false;
    },
    error: (err: HttpErrorResponse) => console.error('❌ Error sending:', err)
  });
}


  triggerLocalFilePicker(){
    this.fileInput.nativeElement.click();
  }
  // onFileSelected(event: Event){
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if(file && file.size>0){
  //     this.isFileAttached = true;
  //   }else{
  //     this.isFileAttached = false;
  //   }
  //   console.log('LocalFileSelected:',file);
  // }
  uploadFromOneDrive(){
    console.log('Open Ondrive picker')
  }
  onAttachClick(){
    this.triggerLocalFilePicker();
  }
  attachedFile: File | null = null;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.attachedFile = input.files[0];
    this.isFileAttached=true;
  }
}

removeAttachment() {
  this.attachedFile = null;
  this.isFileAttached = false; // ✅ hide model dropdown
}

}
