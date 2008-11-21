class Surfspot
  include DataMapper::Resource
  
  property :id, Serial
  property :name, String
  property :description, Text
  property :longitude, Float #Long and lat need to be truncated to 11 digits.
  property :latitude, Float
  property :region, String
  property :town, String
  property :postcode, Integer
  property :state, String

end
