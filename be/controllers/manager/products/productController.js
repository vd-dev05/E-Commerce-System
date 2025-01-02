const ManagerProductController = {
    createProducts : async (req, res) => {
        try {
            const {brand_name , description , variants } = req.body;

            const data = {
                brand_name,
                description,
                variants
            }
            console.log(data);
            
        } catch (error) {
            
        }
    }
}
export default ManagerProductController;