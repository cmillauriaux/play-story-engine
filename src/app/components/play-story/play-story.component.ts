import { Component, OnInit } from '@angular/core';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { Dialog } from 'story-engine-library/lib/models/Dialog';
import { Choice } from 'story-engine-library/lib/models/Choice';
import { StoryService } from '../../providers/story.service';

@Component({
  selector: 'app-play-story',
  templateUrl: './play-story.component.html',
  styleUrls: ['./play-story.component.scss']
})
export class PlayStoryComponent implements OnInit {

  public story: StoryModel;
  public sequence: SequenceModel;
  public dialog: Dialog;
  public currentDialogIdx = 0;
  public choices: Choice[];

  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.loadStory();
  }

  async loadSequence() {
    this.choices = undefined;
    this.dialog = undefined;
    this.currentDialogIdx = 0;
    this.sequence = await this.storyService.getSequence();
    if (this.sequence.dialogs && this.sequence.dialogs.length > 0) {
      this.displayDialogs();
    } else {
      this.displayChoices();
    }
  }

  async loadStory() {
    if (!this.storyService.isStoryLoaded()) {
      await this.storyService.loadStory('C://Projets//javascript-story-engine//example//sample-story');
      this.loadStory();
    } else {
      this.story = await this.storyService.getStory();
      this.loadSequence();
    }
  }

  async displayDialogs() {
    if (this.sequence.dialogs && this.sequence.dialogs.length > 0) {
      this.dialog = this.sequence.dialogs[this.currentDialogIdx];
    }
  }

  async displayChoices() {
    this.choices = this.sequence.choices;
  }

  async makeChoice(choice: number) {
    const consequences = await this.storyService.makeChoice(choice);
    console.log(consequences);
    this.loadSequence();
  }

  async nextDialog() {
    if (this.dialog) {
      this.currentDialogIdx++;
      if (this.sequence.dialogs && this.sequence.dialogs.length > 0 && this.currentDialogIdx < this.sequence.dialogs.length) {
        this.dialog = this.sequence.dialogs[this.currentDialogIdx];
      } else {
        this.displayChoices();
      }
    }
  }

}
