export const useFormData = () => {
    const buildFromData = (data: Record<string, any>, files?: File[]) => {
        const formData = new FormData();
    
        // if file available
        if (files && files.length > 0) {
            files.forEach((file) => {
                if (file) {
                    formData.append("images", file);
                }
            })
        }
        // append normal field
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        })
            console.log("from from data",data, files)
            console.log("Form Data:", formData);
        return formData;
    }
    return { buildFromData };
}