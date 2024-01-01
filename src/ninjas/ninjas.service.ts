import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 1, name: 'ninjaA', weapon: 'stars' },
    { id: 2, name: 'ninjaB', weapon: 'sword' },
    { id: 3, name: 'ninjaC', weapon: 'gun' }
  ];

  getNinjas(weapon?: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }
  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    console.log(ninja);
    if (!ninja) {
      throw new Error('Ninja not found!');
    }
    return ninja;
  }
  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: new Date().getTime()
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }
  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.ninjas
  }
  removeNinja(id: number) {
    const removedNinja = this.getNinja(id)
    this.ninjas = this.ninjas.filter((ninja) =>ninja.id !== id);
    return removedNinja;
  }
}
