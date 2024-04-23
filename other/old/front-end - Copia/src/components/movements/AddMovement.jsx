import FormField from "../form/FormField";
import SubmitButton from "../form/SubmitButton";

function AddMovement({handleInputChange, handleSubmit}){
    return (
      <form>
        <FormField
          label="Amount"
          type="number"
          id="amount"
          name="amount"
          onChange={handleInputChange}
        />
        <datalist id="curerncy">
          <option value="USD" />
          <option value="EUR" />
          <option value="GBP" />
        </datalist>
        <SubmitButton text="Add Movement" onClick={handleSubmit} />
      </form>
    );
}