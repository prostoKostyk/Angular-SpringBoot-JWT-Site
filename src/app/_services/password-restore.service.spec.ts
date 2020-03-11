import { TestBed } from "@angular/core/testing";

import { PasswordRestoreService } from "./password-restore.service";

describe("PasswordRestoreService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PasswordRestoreService = TestBed.get(PasswordRestoreService);
    expect(service).toBeTruthy();
  });
});
