defmodule Api.Workingtimes do
  @moduledoc """
  The Workingtimes context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Workingtimes.Workingtime

  @doc """
  Returns the list of workingtimes.

  ## Examples

      iex> list_workingtimes()
      [%Workingtime{}, ...]

  """
  # complete method
  def list_workingtimes(%{"userId" => userId, "start" => start, "end" => end_time}) do
    Repo.all(from t in Workingtime,
             where: t.user == ^userId and t.start == ^start and t.end == ^end_time)
  end

  # only userId and start method
  def list_workingtimes(%{"userId" => userId, "start" => start}) do
    Repo.all(from t in Workingtime,
             where: t.user == ^userId and t.start == ^start)
  end

  #only userId and end method
  def list_workingtimes(%{"userId" => userId, "end" => end_time}) do
    Repo.all(from t in Workingtime,
             where: t.user == ^userId and t.end == ^end_time)
  end

  #only userId
  def list_workingtimes(%{"userId" => userId}) do
    Repo.all(from t in Workingtime,
             where: t.user == ^userId)
  end

  def list_workingtimes do
    Repo.all(Workingtime)
  end


  @doc """
  Gets a single workingtime.

  Raises `Ecto.NoResultsError` if the Workingtime does not exist.

  ## Examples

      iex> get_workingtime!(123)
      %Workingtime{}

      iex> get_workingtime!(456)
      ** (Ecto.NoResultsError)

  """
  def get_workingtime!(id), do: Repo.get!(Workingtime, id)

  def get_workingtime_by_user(userId, id), do: Repo.get_by(Workingtime, [user: userId, id: id])


  @doc """
  Creates a workingtime.

  ## Examples

      iex> create_workingtime(%{field: value})
      {:ok, %Workingtime{}}

      iex> create_workingtime(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_workingtime(attrs \\ %{}) do
    %Workingtime{}
    |> Workingtime.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a workingtime.

  ## Examples

      iex> update_workingtime(workingtime, %{field: new_value})
      {:ok, %Workingtime{}}

      iex> update_workingtime(workingtime, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_workingtime(%Workingtime{} = workingtime, attrs) do
    workingtime
    |> Workingtime.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a workingtime.

  ## Examples

      iex> delete_workingtime(workingtime)
      {:ok, %Workingtime{}}

      iex> delete_workingtime(workingtime)
      {:error, %Ecto.Changeset{}}

  """
  def delete_workingtime(%Workingtime{} = workingtime) do
    Repo.delete(workingtime)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking workingtime changes.

  ## Examples

      iex> change_workingtime(workingtime)
      %Ecto.Changeset{data: %Workingtime{}}

  """
  def change_workingtime(%Workingtime{} = workingtime, attrs \\ %{}) do
    Workingtime.changeset(workingtime, attrs)
  end
end
