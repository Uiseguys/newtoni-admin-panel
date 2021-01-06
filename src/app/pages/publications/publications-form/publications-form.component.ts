import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { ImageService } from "../../image/image.service";
import { SettingsService } from "../../../services/settings/settings.service";

import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-publications-form",
  templateUrl: "./publications-form.component.html",
  styleUrls: ["./publications-form.component.css"]
})
export class PublicationsFormComponent implements OnInit, OnChanges {
  @Input("isCreate") isCreate: boolean = true;
  @Input("initialValue") initialValue: any = {};

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  description: string | null;
  form: FormGroup;
  error = "";
  packagings = [];
  image = [];
  images = [];

  modalRef: any;

  constructor(
    private fb: FormBuilder,
    private imageApi: ImageService,
    private modalService: BsModalService,
    private settings: SettingsService
  ) {
    this.form = fb.group({
      name: ["", Validators.compose([Validators.required])],
      price: ["", Validators.compose([Validators.required])],
      availability: [""],
      content: [""],
      priority: [""],
      no: [""],
      description: [""]
    });

    this.form.controls.availability.setValue(true);
    this.form.controls.priority.setValue(0);
  }

  ngOnInit() {
    this.imageApi.getAllImages().subscribe(res => {
      this.images = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.initialValue &&
      changes.initialValue.previousValue &&
      changes.initialValue.previousValue.id !== this.initialValue.id
    ) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setValue(this.initialValue[key]);
      });
      this.description = this.initialValue.description;
      this.image = this.initialValue.image;
    }
  }

  handleSubmit($event) {
    $event.preventDefault();

    this.form.controls["description"].setValue(this.description);
    for (let c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }
    if (this.form.value.vintage === "") {
      this.form.value.vintage = 0;
    }
    if (!this.form.valid) return;
    this.onSubmit.emit({
      ...this.form.value,
      image: JSON.stringify(this.image)
    });
  }

  setImage(file) {
    this.image = file.weblinkUrl;
  }

  showImageSelectModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  selectImage(selectedImage, $event) {
    $event.preventDefault();
    this.image.push(selectedImage.public_id);
    this.modalRef.hide();
  }

  deleteImage(image) {
    if (!confirm("Are you sure to delete")) return;
    const index = this.image.indexOf(image);
    this.image.splice(index, 1);
    console.log(this.image);
  }
}
