import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    // so here 
    // const service = new NinjasService();
    // const controller = new NinjasController(service);
    // it's happeing and and nest is doing it by defualt by 
    // dependecy injection ---> dont need to instantiate calses nest handles by defualt
  constructor(private readonly ninjasService: NinjasService) {}
  @Get() // this is route /ninjas
  getNinjas() {
    return this.ninjasService.getNinjas();
  }
  @Get('/query/test') // this is route /ninjas?weapon=stars
  getNinjaQuery(@Query('weapon') weapon: string) {
    return this.ninjasService.getNinjas(weapon);
  }
  @Get(':id') // this is route /ninjas/:id
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
        //params are comming as string so we can use defult pipes to covert
        //because ParseIntPipe this pipe string is converted to number
        return this.ninjasService.getNinja(id);
    } catch (error) {
        //you can handle specif errors thorwn by 
        //catching and knowing from where it is thrown
        // if(error instanceof DBException) {
        // }
        //built in error thrown from here
        throw new  NotFoundException()
    }
    
  }
  @Get('/query/new') // this is route /ninjas?test=query&type=test123
  getNinjaWithQuery(@Query('test') query: string, @Query('type') type: string) {
    console.log('here');
    return [
      {
        query,
        type
      }
    ];
  }
  @Post() // this is route /ninjas with body
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }
  @Put(':id') // this is route /ninjas/123 with body
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }
  @Delete(':id') // this is route /ninjas/123
  removeNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id)
  }

}

//decorators --> starts with @ and can be defined for class, method or a property, decortors will be placed at top of function,clases
// decorators --> 
// dependecy injection -->
//providers -->

// GET /ninjas --> []
// POST /ninjas/:Id -->
//PUT /ninjas/:Id -->
// DELETE /ninjas/:Id
//SO BASICALLY ALL ROUTES WILL START WITH NINJAS


//exception handling
// nest handles errors thorwn automatically
// send 501 if any error from server


//pipes in nest
// transformations and validations



//gaurds
// to protect routes
// nest g guarg --> to create a gaurd