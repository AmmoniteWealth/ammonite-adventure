import { useState } from "react";
import styles from "./form.module.css";
import React from "react";
const INSERT_FORM_DATA_MUTATION = `
  mutation insertFormData($first_name: String!, $last_name: String!, $email: String!, $goal_name: String!, $goal_notes: String!) {
    insert_Users(objects: [{first_name: $first_name, last_name: $last_name, email: $email, goal_name: $goal_name, goal_notes: $goal_notes, }]) {
      affected_rows
    }
  }
`;

function UserForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    goal_name: "",
    goal_notes: "",
  });
  const { X_HASURA_ADMIN_SECRET, NEXT_PUBLIC_API_URL } = process.env;
  const secret = process.env.X_HASURA_ADMIN_SECRET;
  function handleInputChange(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    const X_HASURA_ADMIN_SECRET: string | undefined = secret;

    if (!X_HASURA_ADMIN_SECRET) {
      throw new Error("X_HASURA_ADMIN_SECRET is not defined");
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-hasura-admin-secret", X_HASURA_ADMIN_SECRET);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: INSERT_FORM_DATA_MUTATION,
        variables: formData,
      }),
    };
    event.preventDefault();
    try {
      const response = await fetch(
        "https://ammonitestory.hasura.app/v1/graphql",
        requestOptions
      );

      const data = await response.json();

      // console.log("Form data inserted:", data, success);
      setFormData({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        goal_name: formData.goal_name,
        goal_notes: formData.goal_notes,
      });
      // redirect to success page
      window.location.href = "/success";
    } catch (error) {
      console.error("Error inserting form data:", error);
    }
  }

  console.log("user from formData form", formData, formData.first_name);
  return (
    <form onSubmit={handleSubmit} name="custom">
      <input type="hidden" name="form-name" value="custom" />
      <input type="hidden" name="form-name" value="custom" />

      <br />
      <label>First name</label>
      <br />
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
        className={styles.inputField}
      />

      <br />
      <label>Last name</label>
      <br />
      <input
        type="text"
        name="last_name"
        id="last_name"
        onChange={handleInputChange}
        value={formData.last_name}
        className={styles.inputField}
      />

      <br />
      <label>Email</label>
      <br />
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleInputChange}
        value={formData.email}
        className={styles.inputField}
      />

      <br />
      <label>Goal name</label>
      <br />
      <input
        type="goal_name"
        name="goal_name"
        id="goal_name"
        onChange={handleInputChange}
        value={formData.goal_name}
        className={styles.inputField}
      />

      <br />
      <label>Goal notes</label>
      <br />
      <input
        type="goal_notes"
        name="goal_notes"
        id="goal_notes"
        onChange={handleInputChange}
        value={formData.goal_notes}
        className={styles.inputField}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
export default UserForm;
