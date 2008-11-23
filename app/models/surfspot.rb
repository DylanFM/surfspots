class Surfspot
  include DataMapper::Resource
  
  property :id, Serial
  property :name, String, :nullable => false
  property :description, Text
  property :longitude, Float, :nullable => false #Long and lat need to be truncated to 11 digits.
  property :latitude, Float, :nullable => false
  property :region, String
  property :town, String
  property :postcode, Integer
  property :state, String, :nullable => false

  validates_is_unique(:name)

end
