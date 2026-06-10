import { Controller, Get, Param } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':workspaceId')
  findById(@Param('workspaceId') workspaceId: string) {
    return this.workspacesService.findById(workspaceId);
  }
}
