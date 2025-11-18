import { Component, ElementRef, OnInit } from '@angular/core';
import { GetColorName } from 'hex-color-to-color-name';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { Supabase } from '../supabase';

@Component({
  selector: 'app-respond-page',
  imports: [MatInputModule, MatFormFieldModule, MatButton, MatProgressSpinnerModule, FormsModule],
  templateUrl: './respond-page.html',
  styleUrl: './respond-page.css',
})
export class RespondPage implements OnInit {
  public color = "---"
  public hexcode = "#"
  public name = "";
  public experience = "";

  constructor(private elementRef: ElementRef, 
    private readonly sb: Supabase) {} 
  
  ngOnInit() {
    this.loadColor();
  }

  async loadColor() {
    var color = await this.sb.getColor(this.elementRef);
    this.color = GetColorName(color);
    this.hexcode = color;
  }

  async submitExperience() {
    console.log(this.name, this.experience);
    if (this.name.length <= 0) {
      alert("Please enter a name");
      return;
    } else if (this.experience.length <= 0) {
      alert("Please enter your experience!");
      return;
    } else {
      document.getElementById("submit-button")?.classList.toggle("hidden");
      document.getElementById("spinner")?.classList.toggle("hidden");

      let success = await this.sb.submitExperience(this.name, this.experience, this.hexcode);
      if (success) {
        document.getElementById("spinner")?.classList.toggle("hidden");
        document.getElementById("success-message")?.classList.toggle("hidden");
      } else {
        alert("Failed to save your response. Please try again!");
        document.getElementById("submit-button")?.classList.toggle("hidden");
        document.getElementById("spinner")?.classList.toggle("hidden");
      }
    }
  }
}
