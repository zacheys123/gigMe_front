export const single_func = (page_ref, background_ref) => {
	page_ref?.singleref?.current?.classList?.add('active_page');
	page_ref?.phoneref?.current?.classList?.add('in_active_page');
	page_ref?.groupref?.current?.classList?.add('in_active_page');
	page_ref?.videoref?.current?.classList?.add('in_active_page');
	background_ref?.video_ref?.current?.classList?.add('in_active');
	background_ref?.single_ref?.current?.classList?.add('active');
	background_ref?.phone_ref?.current?.classList?.add('in_active');
	background_ref?.group_ref?.current?.classList?.add('in_active');

	// remove classes
	page_ref?.phoneref?.current?.classList?.remove('active_page');
	page_ref?.groupref?.current?.classList?.remove('active_page');
	page_ref?.videoref?.current?.classList?.remove('active_page');
	background_ref?.video_ref?.current?.classList?.remove('active');

	background_ref?.phone_ref?.current?.classList?.remove('active');
	background_ref?.group_ref?.current?.classList?.remove('active');
};
export const phone_func = (page_ref, background_ref) => {
	page_ref?.singleref?.current?.classList?.add('in_active_page');
	page_ref?.phoneref?.current?.classList?.add('active_page');
	page_ref?.groupref?.current?.classList?.add('in_active_page');
	page_ref?.videoref?.current?.classList?.add('in_active_page');
	background_ref?.video_ref?.current?.classList?.add('in_active');
	background_ref?.single_ref?.current?.classList?.add('in_active');
	background_ref?.phone_ref?.current?.classList?.add('active');
	background_ref?.groupref?.current?.classList?.add('in_active');

	// remove classes
	page_ref?.singleref?.current?.classList?.remove('active_page');
	page_ref?.groupref?.current?.classList?.remove('active_page');
	page_ref?.videoref?.current?.classList?.remove('active_page');
	background_ref?.video_ref?.current?.classList?.remove('active');
	background_ref?.single_ref?.current?.classList?.remove('active');

	background_ref?.group_ref?.current?.classList?.remove('active');
};
export const group_func = (page_ref, background_ref) => {
	page_ref?.singleref?.current?.classList?.add('in_active_page');
	page_ref?.phoneref?.current?.classList?.add('in_active_page');
	page_ref?.groupref?.current?.classList.add('active_page');
	page_ref?.videoref?.current?.classList?.add('in_active_page');
	background_ref?.video_ref?.current?.classList?.add('in_active');
	background_ref?.phoneref?.current?.classList?.add('in_active');
	background_ref?.phone_ref?.current?.classList?.add('in_active');
	background_ref?.group_ref?.current?.classList?.add('active');

	// remove classes
	page_ref?.phoneref?.current?.classList?.remove('active_page');
	page_ref?.singleref?.current?.classList?.remove('active_page');
	page_ref?.videoref?.current?.classList?.remove('active_page');
	background_ref?.video_ref?.current?.classList?.remove('active');

	background_ref?.phone_ref?.current?.classList?.remove('active');
	background_ref?.single_ref?.current?.classList?.remove('active');
};
export const video_func = (page_ref, background_ref) => {
	page_ref?.singleref?.current?.classList?.add('in_active_page');
	page_ref?.phoneref?.current?.classList?.add('in_active_page');
	page_ref?.groupref?.current?.classList?.add('in_active_page');
	page_ref?.videoref?.current?.classList.add('active_page');
	background_ref?.video_ref?.current?.classList?.add('active');
	background_ref?.phoneref?.current?.classList?.add('in_active');
	background_ref?.phone_ref?.current?.classList?.add('in_active');
	background_ref?.group_ref?.current?.classList?.add('in_active');

	// remove classes
	page_ref?.phoneref?.current?.classList?.remove('active_page');
	page_ref?.groupref?.current?.classList?.remove('active_page');
	page_ref?.singleref?.current?.classList?.remove('active_page');

	background_ref?.single_ref?.current?.classList?.remove('active');
	background_ref?.phone_ref?.current?.classList?.remove('active');
	background_ref?.group_ref?.current?.classList?.remove('active');
};
export const default_func = (page_ref, background_ref) => {
	page_ref?.singleref?.current?.classList?.add('active_page');
	page_ref?.phoneref?.current?.classList?.add('in_active_page');
	page_ref?.groupref?.current?.classList?.add('in_active_page');
	page_ref?.videoref?.current?.classList?.add('in_active_page');
	background_ref?.video_ref?.current?.classList?.add('in_active');
	background_ref?.single_ref?.current?.classList?.add('active');
	background_ref?.phone_ref?.current?.classList?.add('in_active');
	background_ref?.group_ref?.current?.classList?.add('in_active');
};
