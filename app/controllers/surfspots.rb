class Surfspots < Application
  provides :json

  def index
    @surfspots = Surfspot.all :order => [:name.asc]
    display @surfspots
  end

  def show(id)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    display @surfspot
  end

  def new
    only_provides :html
    @surfspot = Surfspot.new
    display @surfspot
  end

  def edit(id)
    only_provides :html
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    display @surfspot
  end
  
  def delete(id)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    display @surfspot
  end

  def create(surfspot)
    @surfspot = Surfspot.new(surfspot)
    msg = {}
    if @surfspot.save
      msg[:notice] = "The spot #{@surfspot.name} was created"
      if request.xhr?
        msg.to_json
      else  
        redirect resource(@surfspot), :message => msg
      end
    else
      message[:error] = "Surfspot failed to be created"
      msg[:error] = [message[:error]] << @surfspot.errors.to_a
      if request.xhr?
        msg.to_json
      else
        render :new
      end
    end
  end

  def update(id, surfspot)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    if @surfspot.update_attributes(surfspot)
       redirect resource(@surfspot)
    else
      display @surfspot, :edit
    end
  end

  def destroy(id)
    @surfspot = Surfspot.get(id)
    raise NotFound unless @surfspot
    if @surfspot.destroy
      redirect resource(:surfspots)
    else
      raise InternalServerError
    end
  end

end # Surfspots
