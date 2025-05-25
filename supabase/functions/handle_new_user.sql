
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.profiles (
    id, 
    phone_number, 
    full_name, 
    user_role, 
    county,
    sub_county,
    farmer_type,
    business_name,
    business_type,
    mpesa_number
  )
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'phone_number', 
      NEW.raw_user_meta_data ->> 'mpesa_number',
      NEW.phone,
      '+254700000000'  -- Default fallback phone number
    ),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'User'),
    COALESCE((NEW.raw_user_meta_data ->> 'user_role')::public.user_role, 'farmer'),
    COALESCE(NEW.raw_user_meta_data ->> 'county', 'Nairobi'),
    NEW.raw_user_meta_data ->> 'sub_county',
    NEW.raw_user_meta_data ->> 'farmer_type',
    NEW.raw_user_meta_data ->> 'business_name',
    NEW.raw_user_meta_data ->> 'business_type',
    NEW.raw_user_meta_data ->> 'mpesa_number'
  );
  RETURN NEW;
END;
$function$;
