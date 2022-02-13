import { User } from './user';
import { Image } from './image';
import { HouseFeature } from './house-feature';

export class House {
  private _id: number;
  private _agent: User;
  private _client: User;
  private _listing: string;
  private _houseType: string;
  private _bathRoomCount: string;
  private _bedRoomCount: string;
  private _totalRoomCount: string;
  private _parkingSpotCount: string;
  private _livingArea: string;
  private _createdAt: Date;
  private _address: string;
  private _price: string;
  private _comments: string;
  private _features: HouseFeature[];
  featureIds: number[];
  private _images: Image[];
  imageIds: number[];


  constructor(id: number, agent: User, client: User, listing: string, houseType: string, bathRoomCount: string, bedRoomCount: string, totalRoomCount: string, parkingSpotCount: string, livingArea: string,
              createdAt: Date, address: string, price: string, comments: string, features: HouseFeature[], images: Image[]) {
    this._id = id;
    this._agent = agent;
    this._client = client;
    this._listing = listing;
    this._houseType = houseType;
    this._bathRoomCount = bathRoomCount;
    this._bedRoomCount = bedRoomCount;
    this._totalRoomCount = totalRoomCount;
    this._parkingSpotCount = parkingSpotCount;
    this._livingArea = livingArea;
    this._createdAt = createdAt;
    this._address = address;
    this._price = price;
    this._comments = comments;
    this._features = features;
    this._images = images;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get agent(): User {
    return this._agent;
  }

  set agent(value: User) {
    this._agent = value;
  }

  get client(): User {
    return this._client;
  }

  set client(value: User) {
    this._client = value;
  }

  get listing(): string {
    return this._listing;
  }

  set listing(value: string) {
    this._listing = value;
  }

  get houseType(): string {
    return this._houseType;
  }

  set houseType(value: string) {
    this._houseType = value;
  }

  get bathRoomCount(): string {
    return this._bathRoomCount;
  }

  set bathRoomCount(value: string) {
    this._bathRoomCount = value;
  }

  get bedRoomCount(): string {
    return this._bedRoomCount;
  }

  set bedRoomCount(value: string) {
    this._bedRoomCount = value;
  }

  get totalRoomCount(): string {
    return this._totalRoomCount;
  }

  set totalRoomCount(value: string) {
    this._totalRoomCount = value;
  }

  get parkingSpotCount(): string {
    return this._parkingSpotCount;
  }

  set parkingSpotCount(value: string) {
    this._parkingSpotCount = value;
  }

  get livingArea(): string {
    return this._livingArea;
  }

  set livingArea(value: string) {
    this._livingArea = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get price(): string {
    return this._price;
  }

  set price(value: string) {
    this._price = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }

  get features(): HouseFeature[] {
    return this._features;
  }

  set features(value: HouseFeature[]) {
    this._features = value;
  }

  get images(): Image[] {
    return this._images;
  }

  set images(value: Image[]) {
    this._images = value;
  }
}
