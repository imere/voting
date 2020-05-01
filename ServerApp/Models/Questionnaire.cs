/* Auto generated */
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace vote.Models {
  public class BaseType {
    public string Label { get; set; }
    public string Name { get; set; }
    public string Extra { get; set; }
    public object Rules { get; set; }
  }
  public class TypeNumber : BaseType {
    public readonly string Typename = "number";
    public double? Value { get; set; }
    public double? Min { get; set; }
    public double? Max { get; set; }
  }
  public class TypeInput : BaseType {
    public readonly string Typename = "input";
    public string Value { get; set; }
  }
  public class TypeTextArea : BaseType {
    public readonly string Typename = "textarea";
    public string Value { get; set; }
  }
  public class TypeSwitch : BaseType {
    public readonly string Typename = "switch";
    public bool? Value { get; set; }
  }
  public class TypeSlider : BaseType {
    public readonly string Typename = "slider";
    public double? Value { get; set; }
    public object Options { get; set; }
  }
  public class TypeRadio : BaseType {
    public readonly string Typename = "radio";
    public string Type { get; set; }
    public string Value { get; set; }
    public object Options { get; set; }
  }
  public class TypeCheckBox : BaseType {
    public readonly string Typename = "checkbox";
    public bool? Value { get; set; }
  }
  public class TypeCheckBoxGroup : BaseType {
    public readonly string Typename = "checkboxgroup";
    public ICollection<string> Value { get; set; }
    public object Options { get; set; }
  }
  public class TypeRate : BaseType {
    public readonly string Typename = "rate";
    public double? Value { get; set; }
  }
  public class TypeSelect : BaseType {
    public readonly string Typename = "select";
    public string Value { get; set; }
    public object Options { get; set; }
  }
  public class TypeSelectMultiple : BaseType {
    public readonly string Typename = "selectmultiple";
    public ICollection<string> Value { get; set; }
    public ICollection<string> Options { get; set; }
  }
  public class TypeCascade : BaseType {
    public readonly string Typename = "cascade";
    public ICollection<string> Value { get; set; }
    public object Options { get; set; }
  }
  public class TypeDate : BaseType {
    public readonly string Typename = "date";
    public string Value { get; set; }
  }
  public class TypeDateRange : BaseType {
    public readonly string Typename = "daterange";
    public ICollection<string> Value { get; set; }
  }
  public class TypeTime : BaseType {
    public readonly string Typename = "time";
    public string Value { get; set; }
  }
  public class TypeTimeRange : BaseType {
    public readonly string Typename = "timerange";
    public ICollection<string> Value { get; set; }
  }

  public class Questionnaire {
    public string Title { get; set; }
    public string Description { get; set; }
    public bool? IsPublic { get; set; } = true;
    public DateTime? ExpiresAt { get; set; }
    public object Content { get; set; }
  }
  public class QuestionnaireUpdate : Questionnaire {
	[Required]
    public long Id { get; set; }
  }
  public class QuestionnaireResponse : Questionnaire {
	[Required]
    public long Id { get; set; }
    public DateTime CreatedAt { get; set; }
  }
  public class Answer {}
  public class QuestionnaireAnswer {
	[Required]
    public long Id { get; set; }
    public object Answer { get; set; }
	[Required]
    public long PollId { get; set; }
	[Required]
    public long UserId { get; set; }
    public string CreatedAt { get; set; }
  }
  public class QuestionnaireWithAnswer : QuestionnaireResponse {
    public object PollAnswers { get; set; }
  }
}