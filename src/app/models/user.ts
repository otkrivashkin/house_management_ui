import { Gender } from '../consts/gender';
import { Position } from '../consts/position';
import { Image } from './image';
import { Skill } from './skill';

export class User {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _gender: Gender;
  private readonly _phoneNumber: string;
  private readonly _email: string;
  private readonly _address: string;
  private readonly _password: string;
  private readonly _position: Position;
  private readonly _imgUrl: string;
  private _file: File;
  private _image: Image;
  private _imageId: number;
  private readonly _agentId: number;
  private readonly _agent: User;
  private readonly _skills: Skill[];
  private _skillIds: number[];
  private readonly _description: string;

  constructor(
    id: number,
    name: string,
    gender: Gender,
    phoneNumber: string,
    email: string,
    address: string,
    password: string,
    position: Position,
    imgUrl: string,
    file: File,
    image: Image,
    imageId: number,
    skills: Skill[],
    skillIds: number[],
    agentId: number,
    agent: User,
    description: string) {
    this._id = id;
    this._name = name;
    this._gender = gender;
    this._phoneNumber = phoneNumber;
    this._email = email;
    this._address = address;
    this._password = password;
    this._position = position;
    this._imgUrl = imgUrl;
    this._file = file;
    this._image = image;
    this._imageId = imageId;
    this._skillIds = skillIds;
    this._skills = skills;
    this._agentId = agentId;
    this._agent = agent;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get gender(): Gender {
    return this._gender;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
  }

  get password(): string {
    return this._password;
  }

  get position(): Position {
    return this._position;
  }

  get imgUrl(): string {
    return this._imgUrl;
  }

  get file(): File {
    return this._file;
  }

  set file(value: File) {
    this._file = value;
  }

  get image(): Image {
    return this._image;
  }

  set image(value: Image) {
    this._image = value;
  }

  get imageId(): number {
    return this._imageId;
  }

  set imageId(value: number) {
    this._imageId = value;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  get skillIds(): number[] {
    return this._skillIds;
  }

  set skillIds(value: number[]) {
    this._skillIds = value;
  }

  get agentId(): number {
    return this._agentId;
  }

  get agent(): User {
    return this._agent;
  }

  get description(): string {
    return this._description;
  }
}
