import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LigneDocumentAchatComponent } from './ligne-document-achat.component';

describe('LigneDocumentAchatComponent', () => {
  let component: LigneDocumentAchatComponent;
  let fixture: ComponentFixture<LigneDocumentAchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LigneDocumentAchatComponent],
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    });

    fixture = TestBed.createComponent(LigneDocumentAchatComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases based on your component's functionality
});
