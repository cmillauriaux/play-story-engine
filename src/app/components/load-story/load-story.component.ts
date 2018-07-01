import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoryService } from '../../providers/story.service';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-load-story',
  templateUrl: './load-story.component.html',
  styleUrls: ['./load-story.component.scss']
})
export class LoadStoryComponent implements OnInit {

  public error = false;

  @ViewChild('selectDirectoryButton') selectDirectoryButton: ElementRef;

  constructor(private storyService: StoryService, private router: Router) { }

  ngOnInit() {
  }

  loadStory() {
    this.selectDirectoryButton.nativeElement.click();
  }

  async selectStoryDirectory(event) {
    this.error = false;
    const files = event.srcElement.files;
    if (files && files.length > 0) {
      const file = event.target.files[0];
      const story = await this.storyService.loadStory(file.path);
      if (!story) {
        this.error = true;
      } else {
        this.router.navigate(['/play']);
      }
      /*this.file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.storyLoaded.emit(fileReader.result);
        this.fileSelected.emit(this.file.path);
      };
      fileReader.readAsText(this.file);*/
    }
  }

}
