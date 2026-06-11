import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { parseCreateCampaignNoteRequest, parseUpdateCampaignNoteRequest } from './note.requests';
import { NotesService } from './notes.service';

@Controller('campaigns/:campaignId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAllByCampaign(@Param('campaignId') campaignId: string) {
    return this.notesService.findAllByCampaign(campaignId);
  }

  @Post()
  create(@Param('campaignId') campaignId: string, @Body() body: unknown) {
    return this.notesService.create(campaignId, parseCreateCampaignNoteRequest(body));
  }

  @Patch(':noteId')
  update(@Param('campaignId') campaignId: string, @Param('noteId') noteId: string, @Body() body: unknown) {
    return this.notesService.update(campaignId, noteId, parseUpdateCampaignNoteRequest(body));
  }
}
