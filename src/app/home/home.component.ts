import { Component, OnInit, } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators'
import { SelectedFunds } from '../selected-funds.model';
import { Schemes } from '../schemes.model';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component'
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public fundAlreadyExists: boolean = false;
  public entries: Schemes[] = [];
  public apiFetchResultEmpty: boolean = false;
  public defaultValue: number = 1;
  public myControl = new FormControl();
  public searchKeyword: string;
  public blankSearchText: boolean = false;
  public selectedFunds: SelectedFunds[] = [];
  public totalUnits: number;

  constructor(private httpservice: HttpServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.myControl.valueChanges.pipe(debounceTime(500)).subscribe(response => {
      this.handleSearchFilter(response);
    });
  }

  handleSearchFilter(response) {
    this.searchKeyword = response;
    if (this.searchKeyword != '') {
      this.blankSearchText = false;
      this.httpservice.getMutualFundsByKeyword(this.searchKeyword).subscribe(response => {
        this.handleGetMutualFundsByKeywordResponse(response)
      });
    }
    else {
      this.apiFetchResultEmpty = true;
      this.entries = [];
      this.blankSearchText = true;
    }
  }

  handleGetMutualFundsByKeywordResponse(response) {
    if (response.length == 0 && !this.apiFetchResultEmpty) {
      this.toggleApiFetchResultEmpty();
    }
    else if (response.length != 0) {
      this.entries = response;
      if (this.apiFetchResultEmpty) {
        this.toggleApiFetchResultEmpty();
      }
    }
  }

  toggleApiFetchResultEmpty() {
    this.apiFetchResultEmpty = !this.apiFetchResultEmpty;
  }

  optionSelected(event) {
    this.myControl.setValue('');
    var counter = 0;
    this.selectedFunds.forEach(element => {
      if (element.schemeCode == event.option.value.schemeCode)
        counter++;
    });
    if (counter == 0 && this.selectedFunds.length > 0) {
      if (this.fundAlreadyExists)
        this.fundAlreadyExists = false;
      this.selectedFunds.push(new SelectedFunds(event.option.value.schemeCode, event.option.value.schemeName));
    }
    else if (this.selectedFunds.length == 0)
      this.selectedFunds.push(new SelectedFunds(event.option.value.schemeCode, event.option.value.schemeName));
    else if (counter > 0 && !this.fundAlreadyExists) {
      this.fundAlreadyExists = true;
    }
    this.totalUnits = 0;
    this.selectedFunds.forEach(element => {
      this.totalUnits = this.totalUnits + element.noOfUnits;
    });
  }

  addUnits(index: number) {
    this.selectedFunds[index].noOfUnits++;
    this.totalUnits = 0;
    this.selectedFunds.forEach(element => {
      this.totalUnits = this.totalUnits + element.noOfUnits;
    });
  }

  reduceUnits(index: number) {
    if (this.selectedFunds[index].noOfUnits > 1)
      this.selectedFunds[index].noOfUnits--;
    this.totalUnits = 0;
    this.selectedFunds.forEach(element => {
      this.totalUnits = this.totalUnits + element.noOfUnits;
    });
  }

  openDialog(selectedFund: SelectedFunds) {
    this.httpservice.getMutualFundBySchemeCode(selectedFund.schemeCode).subscribe(response => {
      this.handleGetMutualFundBySchemeCodeResponse(response, selectedFund.noOfUnits);
    });
  }

  handleGetMutualFundBySchemeCodeResponse(response, noOfUnits: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '400px',
      width: '600px',
      data: { fundDetails: response, units: noOfUnits }
    });
  }
}