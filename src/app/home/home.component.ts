import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../_interface/product.model';
import { ProductForCreation } from '../_interface/productForCreation.model';
import { LocalStorageService } from '../local-storage.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public contentType = ['buy','sell'];

  public displayedColumns = ['type', 'name', 'value'];
  public dataSource = new MatTableDataSource<Product>();

  public productForm: FormGroup = new FormGroup({
    type: new FormControl('add'),
    name: new FormControl('', [Validators.maxLength(60)]),
    value: new FormControl('',)
  });

  constructor(private location: Location, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      type: new FormControl('add'),
      name: new FormControl('', [Validators.maxLength(60)]),
      value: new FormControl('',)
    });
    this.getAllProducts();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createProduct = (productFormValue: ProductForCreation) => {
    if (this.productForm.valid) {
      this.executeProductCreation(productFormValue);
    }
  }

  private executeProductCreation = (productFormValue: ProductForCreation) => {
    let product: ProductForCreation = {
      type: productFormValue.type,
      name: productFormValue.name,
      value: productFormValue.type == 'remove' ? productFormValue.value * -1 : productFormValue.value
    }
    this.localStorageService.setItem(new Date().valueOf() + "", JSON.stringify(product));

    // clean form
    this.productForm = new FormGroup({
      type: new FormControl('add'),
      name: new FormControl('', [Validators.maxLength(60)]),
      value: new FormControl('',)
    });

    // search again ?
    this.getAllProducts();
  }

  private getAllProducts = () => {
    this.dataSource.data = this.localStorageService.getAllProcutsOnStorage() as Product[];
  }

  public calculateTotal() {
    return this.dataSource.data.reduce((accum, curr) => accum + curr.value, 0);
  }

}
