import { IncidentModuleModule } from './incident-module.module';

describe('IncidentModuleModule', () => {
  let incidentModuleModule: IncidentModuleModule;

  beforeEach(() => {
    incidentModuleModule = new IncidentModuleModule();
  });

  it('should create an instance', () => {
    expect(incidentModuleModule).toBeTruthy();
  });
});
