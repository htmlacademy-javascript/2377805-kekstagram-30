import {createPhotoDescriptions} from './photo-description.js';
import {createThumbnails} from './thumbnail.js';

const photoDescriptions = createPhotoDescriptions();
createThumbnails(photoDescriptions);
