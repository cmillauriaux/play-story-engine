import { Injectable } from '@angular/core';
import { StoryEngine } from 'story-engine-library/lib/stories';
import { IPersistanceAdapter } from 'story-engine-library/lib/controllers/persistance-adapter';
import { PersistanceLoki } from 'story-engine-library/lib/controllers/persistance-loki';
import { LoaderYML } from 'story-engine-library/lib/controllers/loader-yml';
import { StoryModel } from 'story-engine-library/lib/models/Story';
import { SequenceModel } from 'story-engine-library/lib/models/Sequence';
import { Consequence } from '../../../../javascript-story-engine/lib/models/Consequence';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private stories: StoryEngine.Stories;
  private persistance: IPersistanceAdapter;
  private currentStory: StoryModel;

  constructor() {
    this.stories = new StoryEngine.Stories();
  }

  async loadStory(directory: string): Promise<StoryModel> {
    try {
      this.persistance = new PersistanceLoki();
      const loader = new LoaderYML();
      this.persistance = await loader.loadFiles(this.persistance, directory);
      console.log(await this.persistance.listStories());
      const stories = await this.persistance.listStories();
      if (stories.length > 0) {
        this.stories.setPersistanceAdapter(this.persistance);
        this.currentStory = await this.stories.loadStory(stories[0].id);
        return this.currentStory;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getSequence(): Promise<SequenceModel> {
    return await this.stories.getCurrentSequence();
  }

  async getStory(): Promise<StoryModel> {
    return await this.stories.getCurrentStory();
  }

  async makeChoice(choice: number): Promise<Consequence[]> {
    return await this.stories.makeChoice(choice);
  }

  isStoryLoaded() {
    if (this.currentStory) {
      return true;
    }
    return false;
  }
}
