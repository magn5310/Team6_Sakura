import { createClient } from "@supabase/supabase-js";

const existingApiUrl = "https://olcnopqzlcnocgawqniu.supabase.co/rest/v1/sakurafestival";
const supabaseApiKey = "sb_publishable_M6bj8Sq9gmWKLJAW8cKikg_Ot8_6mS_";
const supabase = createClient("https://olcnopqzlcnocgawqniu.supabase.co", supabaseApiKey);

const likeBtns = document.querySelectorAll(".likebtn");

likeBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    await updateLikedValue(id);
  });
});

async function updateLikedValue(id) {
  try {
    const { data: existingData, error } = await supabase.from("sakurafestival").select().eq("id", id);

    if (error) {
      throw new Error(`Failed to fetch data from API. Error: ${error.message}`);
    }

    if (existingData.length === 0) {
      throw new Error(`Data with ID ${id} not found in API.`);
    }

    const liked = existingData[0].liked === true ? false : true;

    const { data: updatedData, error: updateError } = await supabase.from("sakurafestival").update({ liked }).eq("id", id);

    if (updateError) {
      throw new Error(`Failed to update data in API. Error: ${updateError.message}`);
    }

    console.log("Data successfully updated in API:", updatedData);
  } catch (error) {
    console.error("Error updating data:", error);
  }
}
