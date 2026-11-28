import { readFileSync } from 'node:fs';
import { Amenity, City, HousingType, Offer, UserType } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';

const Separator = {
  Row: '\n',
  Column: '\t',
  List: ';',
} as const;

function parseOffer(row: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatarPath,
    authorType,
    latitude,
    longitude,
  ] = row.split(Separator.Column);

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: city as City,
    previewImage,
    images: images.split(Separator.List),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    type: type as HousingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(Separator.List) as Amenity[],
    author: {
      name: authorName,
      email: authorEmail,
      avatarPath: authorAvatarPath || undefined,
      type: authorType as UserType,
    },
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    },
  };
}

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .trim()
      .split(Separator.Row)
      .map((row) => parseOffer(row));
  }
}
