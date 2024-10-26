import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseApiKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseApiKey);

export const uploadPhoto = async (fileBuffer, originalFileName, mimetype) => {
    try {
        const timestamps = Date.now().toString();
        const fileName = `${timestamps}-${originalFileName}`;

        const { data, error } = await supabase.storage.from('image').upload(fileName, fileBuffer, {
            contentType: mimetype,
        })

        if (error) {
            throw new Error(`Error uploading photo: ${error.message}`);
        }

        const { publicUrl } = supabase.storage.from('image').getPublicUrl(fileName).data;

        return { fileName, imageUrl: publicUrl }
    } catch (e) {
        console.error(e);
        throw new Error(`Error uploading photo: ${e.message}`);
    }
}

export const deletePhoto = async (fileName) => {
    try {
        const { data, error } = await supabase.storage.from('image').remove([fileName]);

        if (error) {
            throw new Error(`Error deleting photo: ${error.message}`);
        }

        return { status: "success", message: "Photo deleted successfully" };
    } catch (e) {
        console.error(e);
        throw new Error(`Error deleting photo: ${e.message}`);
    }
};
